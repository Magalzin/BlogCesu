import express, { Request, Response } from "express";
import mysql from "mysql2/promise";

const app = express();

// Configura EJS como a engine de renderização de templates
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

const connection = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mudar123",
    database: "unicesumar"
});

// Middleware para permitir dados no formato JSON
app.use(express.json());
// Middleware para permitir dados no formato URLENCODED
app.use(express.urlencoded({ extended: true }));

app.get('/users', async function (req: Request, res: Response) {
    try {
        const [sqlCommand] = await connection.query(`
            SELECT u.id, u.name, u.email, u.ativo, p.descricao, DATE_FORMAT(u.created_at, '%d-%m-%Y') AS formatted_date FROM users u
            INNER JOIN papel p ON u.papel_id = p.id
            ORDER BY u.id ASC;
        `);

        return res.render('users/index', {
            users: sqlCommand
        });

    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).send('Internal Server Error');
    }
});

app.get('/users/add', async function (req: Request, res: Response) {
    return res.render('users/form')
})

app.post('/users', async function (req: Request, res: Response) {
    const body = req.body;
    const isOn = body.ativo ? true : false;
    const insertQuery = "INSERT INTO users (name, email, senha, ativo, papel_id) VALUES (?, ?, ?, ?, ?)";

    if (body.password !== body.confirmPassword) {
        return res.redirect('/users/add');
    }

    try {
        await connection.query(insertQuery, [body.name, body.email, body.password, isOn, body.role]);
        res.redirect("/users");
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
        res.status(500).send('Erro no servidor');
    }
});

app.post('/users/:id/delete', async function(req : Request, rep : Response){
    const id = req.params.id;
    const sqlDelete = 'Delete from users where id = ?';
    await connection.query(sqlDelete,[id])
    rep.redirect("/users")
})

app.get('/login', async function(req : Request, rep : Response){
    return rep.render('users/login') 
})


app.post('/login', async function(req : Request, rep : Response){
    const email = req.body.email;
    const senha = req.body.password;
    const query = 'SELECT * FROM users WHERE email = ? AND senha = ?';
    
    try {
        const [results] = await connection.query(query, [email, senha]);
        console.log(results)
        if (results != null) {
            return rep.render('users/blog') 
        } else {
            console.log('Falha no login');
            // Você pode tratar a falha de login aqui
            return rep.render('users/login')
        }
      } catch (err) {
        
      }
})

app.get('/', function(req, resp){
    return resp.render('users/blog') 
})

app.listen('3000', () => console.log("Server is listening on port 3000"));