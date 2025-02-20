const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors'); 
const app = express(); 

app.use(cors()); 
app.use(express.json()); 

const port = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: '52.87.87.164',
  user: 'canifarma',
  port: 4306, 
  password: 'nLps)T0p34|g:p^yYDY7', 
  database: 'canifarm_tramites_cofepris_javaee' 
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});


app.get('/api/user', (req, res) => {
    const { id } = req.query; 
  const sql = (`SELECT * FROM usuarios_copy1 Where id= ?`, [id]);
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.get('/api/items', (req, res) => {
    
    const sql = 'SELECT DISTINCT nombre_empresa FROM 00_usuarios_detalle ORDER BY nombre_empresa ASC';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password; 

  const sql = `SELECT * FROM usuarios_copy1 WHERE username = ? AND password= ? AND activo=1`;
  
db.query(sql, [username, password], (err, results) => {
  if (err) {
    res.status(401).json({ error: 'Usuario ó Contraeña Erronea' });
  } else {
    res.status(201).json(results);
  }
});

});


app.get('/tramites_user', (req, res) => {
   
  const { id } = req.query;
  const sql = `SELECT *, 
    CASE 
    WHEN activo = 1 THEN 'Si'
    WHEN activo = 0 THEN 'No'
    ELSE 'Desconocido'
    END AS estado,
        DATE_FORMAT(fecha_ingreso, '%d-%m-%Y') AS fecha_ordenada 
        FROM usuarios_detalle_copy1 WHERE usuario_id= ? ORDER BY fecha_ingreso DESC`;
db.query(sql, [id], (err, results) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json(results);
  }
});
});


app.get('/user', (req, res) => {
  const { id } = req.query;
  const sql = `SELECT * FROM usuarios_copy1 Where id= ?`;
db.query(sql, [id], (err, results) => {
  
  if (err) {
    res.status(401).send(err);
  } else {
    res.json(results[0]); 
  }
});
});


app.post('/tramitenew', (req, res) => {
  const { id, numtramite, numvucem, fecha, sanitario, denominaciondis, 
    denominaciongen, clasificacion, estadotramite, prevencion, especificarprev, date_res,
    numresprevencion, date3, consideraciones, observaciones, email, razon_social, nombre_responsable,
    telefono_responsable} = req.body;
    const randomNum = Math.floor(Math.random() * (9999 - 2000 + 1)) + 2000;

  switch (estadotramite) {

        
             case "AUTORIZADO":
        
          const sql ='INSERT INTO usuarios_detalle_copy1 ( folio, usuario_id, email, nombre_empresa, nombre_responsable, telefono_responsable, nombre_comercial, denominacion_generica, indicacion_terapeutica, estado_tramite, categoria, clasificacion, tipo_tramite, via_sometimiento, numero_ingreso, fecha_ingreso, registro_sanitario, observaciones, activo, fecha_registro, fecha_actualizacion ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())';
      
          db.query(sql, [ randomNum, id, email, razon_social,nombre_responsable,telefono_responsable,denominaciondis, denominaciongen, ' ', estadotramite, ' ', clasificacion, estadotramite, '', numtramite, fecha, sanitario, observaciones, '0'], (err, results) => {
                    if (err) return res.status(500).json({ error: "Error en el alta" });
                    res.status(201).send('Trámite registrado exitosamente');
                });
                break;

                case "RECHAZADO / DESECHADO":
        
                const sql2 ='INSERT INTO usuarios_detalle_copy1 ( folio, usuario_id, email, nombre_empresa, nombre_responsable, telefono_responsable, nombre_comercial, denominacion_generica, indicacion_terapeutica, estado_tramite, categoria, clasificacion, tipo_tramite, via_sometimiento, numero_ingreso, fecha_ingreso, registro_sanitario, observaciones, activo, fecha_registro, fecha_actualizacion ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())';
            
                db.query(sql2, [ randomNum, id, email, razon_social,nombre_responsable,telefono_responsable,denominaciondis, denominaciongen, ' ', estadotramite, ' ', clasificacion, estadotramite, '', numtramite, fecha, sanitario, observaciones, '0'], (err, results) => {
                if (err) return res.status(500).json({ error: "Error en el alta" });
                res.status(201).send('Trámite registrado exitosamente');
                      });
                break;

                case "AUTORIZADO CON ERROR":
        
                const sql3 ='INSERT INTO usuarios_detalle_copy1 ( folio, usuario_id, email, nombre_empresa, nombre_responsable, telefono_responsable, nombre_comercial, denominacion_generica, indicacion_terapeutica, estado_tramite, categoria, clasificacion, tipo_tramite, via_sometimiento, numero_ingreso, fecha_ingreso, registro_sanitario, observaciones, activo, fecha_registro, fecha_actualizacion ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())';
            
                db.query(sql3, [ randomNum, id, email, razon_social,nombre_responsable,telefono_responsable,denominaciondis, denominaciongen, ' ', estadotramite, ' ', clasificacion, estadotramite, '', numtramite, fecha, sanitario, observaciones, '0'], (err, results) => {
                if (err) return res.status(500).json({ error: "Error en el alta" });
                res.status(201).send('Trámite registrado exitosamente');
                      });
                break;

                case "CON BORRADOR":
        
                const sql4 ='INSERT INTO usuarios_detalle_copy1 ( folio, usuario_id, email, nombre_empresa, nombre_responsable, telefono_responsable, nombre_comercial, denominacion_generica, indicacion_terapeutica, estado_tramite, categoria, clasificacion, tipo_tramite, via_sometimiento, numero_ingreso, fecha_ingreso, registro_sanitario, observaciones, activo, fecha_registro, fecha_actualizacion ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())';
            
                db.query(sql4, [ randomNum, id, email, razon_social,nombre_responsable,telefono_responsable,denominaciondis, denominaciongen, ' ', estadotramite, ' ', clasificacion, estadotramite, '', numtramite, fecha, sanitario, observaciones, '0'], (err, results) => {
                if (err) return res.status(500).json({ error: "Error en el alta" });
                res.status(201).send('Trámite registrado exitosamente');
                      });
                break;

                case "DESISTIMIENTO":
        
                const sql5 ='INSERT INTO usuarios_detalle_copy1 ( folio, usuario_id, email, nombre_empresa, nombre_responsable, telefono_responsable, nombre_comercial, denominacion_generica, indicacion_terapeutica, estado_tramite, categoria, clasificacion, tipo_tramite, via_sometimiento, numero_ingreso, fecha_ingreso, registro_sanitario, observaciones, activo, fecha_registro, fecha_actualizacion ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())';
            
                db.query(sql5, [ randomNum, id, email, razon_social,nombre_responsable,telefono_responsable,denominaciondis, denominaciongen, ' ', estadotramite, ' ', clasificacion, estadotramite, '', numtramite, fecha, sanitario, observaciones, '0'], (err, results) => {
                if (err) return res.status(500).json({ error: "Error en el alta" });
                res.status(201).send('Trámite registrado exitosamente');
                      });
                break;

                case "EN EVALUACIÓN":
        
                const sql6 ='INSERT INTO usuarios_detalle_copy1 ( folio, usuario_id, email, nombre_empresa, nombre_responsable, telefono_responsable, nombre_comercial, denominacion_generica, indicacion_terapeutica, estado_tramite, categoria, clasificacion, tipo_tramite, via_sometimiento, numero_ingreso, fecha_ingreso, registro_sanitario, observaciones, activo, fecha_registro, fecha_actualizacion ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())';
            
                db.query(sql6, [ randomNum, id, email, razon_social,nombre_responsable,telefono_responsable,denominaciondis, denominaciongen, ' ', estadotramite, ' ', clasificacion, estadotramite, '', numtramite, fecha, sanitario, observaciones, '1'], (err, results) => {
                if (err) return res.status(500).json({ error: "Error en el alta" });
                res.status(201).send('Trámite registrado exitosamente');
                      });
                break;

                case "PREVENCIÓN POR RESPONDER":
        
                const sql7 ='INSERT INTO usuarios_detalle_copy1 ( folio, usuario_id, email, nombre_empresa, nombre_responsable, telefono_responsable, nombre_comercial, denominacion_generica, indicacion_terapeutica, estado_tramite, categoria, clasificacion, tipo_tramite, via_sometimiento, numero_ingreso, fecha_ingreso, registro_sanitario, observaciones, activo, fecha_registro, fecha_actualizacion ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())';
            
                db.query(sql7, [ randomNum, id, email, razon_social,nombre_responsable,telefono_responsable,denominaciondis, denominaciongen, ' ', estadotramite, ' ', clasificacion, estadotramite, '', numtramite, fecha, sanitario, observaciones, '1'], (err, results) => {
                if (err) return res.status(500).json({ error: "Error en el alta" });
                res.status(201).send('Trámite registrado exitosamente');
                      });
                break;

                case "PREVENCIÓN RESPONDIDA":
        
                const sql8 ='INSERT INTO usuarios_detalle_copy1 ( folio, usuario_id, email, nombre_empresa, nombre_responsable, telefono_responsable, nombre_comercial, denominacion_generica, indicacion_terapeutica, estado_tramite, categoria, clasificacion, tipo_tramite, via_sometimiento, numero_ingreso, fecha_ingreso, registro_sanitario, observaciones, activo, fecha_registro, fecha_actualizacion ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())';
            
                db.query(sql8, [ randomNum, id, email, razon_social,nombre_responsable,telefono_responsable,denominaciondis, denominaciongen, ' ', estadotramite, ' ', clasificacion, estadotramite, '', numtramite, fecha, sanitario, observaciones, '1'], (err, results) => {
                if (err) return res.status(500).json({ error: "Error en el alta" });
                res.status(201).send('Trámite registrado exitosamente');
                      });
                break;

      
      default:
          res.status(400).json({ error: "Tipo de trámite no válido" });
  }
});

app.get('/user', (req, res) => {
  const { id } = req.query;
  const sql = `SELECT * FROM usuarios_copy1 Where id= ?`;
db.query(sql, [id], (err, results) => {
  
  if (err) {
    res.status(401).send(err);
  } else {
    res.json(results[0]); 
  }
});
});

app.get('/tramites/:id', (req, res) => {  

  const {id} = req.params;
  const sql = `SELECT *, DATE_FORMAT(fecha_ingreso, '%Y-%m-%d') AS fecha_ordenada FROM usuarios_detalle_copy1 WHERE id = ?`;

   db.query(sql, [id], (err, results) => {

    if (results.length > 0) {  
      return res.json(results[0]);
      
    }else{ 
      res.status(401).send(err);
    }  
  
  });
});


app.delete('/tramite_delete/:id', (req, res) => { 
  const {id} = req.params;

  db.query("DELETE FROM usuarios_detalle_copy1 WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send({ error: "Error en la baja" });
    return res.status(201).send('Usuario Eliminado Exitosamente');
});
});


app.put('/perfil_update/:id', (req, res) => {
  const {id} = req.params;
  const { password, telefono, celular, nombre_responsable, email, tel_responsable, posicion_empresarial } = req.body;


  const sql = `UPDATE usuarios_copy1 
   SET password = ?, telefono = ?, celular = ?, nombre_responsable = ?, correo_responsable = ?, 
   tel_responsable = ?, posicion_empresarial = ? WHERE id = ?`;
  
db.query(sql, [password, telefono, celular, nombre_responsable, email, tel_responsable, posicion_empresarial, id], (err, results) => {
  if (err) {
    res.status(401).json({ error: 'Error al envió de los datos' });
  } else {
    res.status(201).send('Datos actualizados');
  }
});
});

app.put('/datos/:id', (req, res) => {
  const {id} = req.params;

 
  const { registro_sanitario, numero_ingreso, nombre_comercial, denominacion_generica, clasificacion,
    observaciones} = req.body;

    const sql =`UPDATE usuarios_detalle_copy1 
    SET nombre_comercial = ?, denominacion_generica = ?, numero_ingreso = ?, registro_sanitario = ?, observaciones = ?, 
    fecha_actualizacion = ? WHERE id = ?`;

    db.query(sql, [ nombre_comercial, denominacion_generica, numero_ingreso, registro_sanitario, observaciones, 'NOW()'], (err, results) => {
  if (err) {
    res.status(401).json({ error: 'Error al envió de los datos' });
  } else {
    res.status(201).send('Datos actualizados');
  }
});
});

app.post('/registro', (req, res) => {
  const { razon, email, nombre, password, tel, cel} = req.body;

  const sql = 'SELECT * FROM usuarios_copy1 WHERE username = ?';
  
db.query(sql, [email], (err, results) => {
  
  
  if (results.length > 0) {  
    res.status(202).send({ error: 'El correo ya está registrado en nuestro directorio' });
    
  }else{ 
    
    const sql = 'INSERT INTO usuarios_copy1 (username, email, password, role, activo, fecha_registro, razon_social, nombre_usuario, telefono, celular ) VALUES ( ?, ?, ?, "REGISTRO", 1, NOW(), ?, ?, ?, ?)';
  db.query(sql,  [email,email,password,razon,nombre,tel,cel], (err, result) => {
              if (err) return res.status(500).json({ error: "Error en el alta" });
              res.status(201).send('Usuario registrado exitosamente');
          });
  }
    
  
});
});


app.use(express.static(path.join(__dirname, "build")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "login.js"));
});


app.listen(port, () => {
  console.log(`Servidor en http://127.0.0.1:${port}`);
});
