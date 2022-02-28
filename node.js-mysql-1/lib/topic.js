const connection = require('./db');
const template = require('./template');
var qs = require('querystring');


exports.home = function(request, response){
    connection.query('SELECT * FROM topic', function (error, topics) {
        if (error) {
            console.log(error);
        }
          var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = template.list(topics);
        var html = template.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
    });
}

exports.page = function(request, response, queryData){
    connection.query(`SELECT * FROM topic`, function (error, topics){
        if(error){
          throw error;
        }
        connection.query(`SELECT topic.id, title, description, created , topic.author_id AS author_id , name, profile FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id = ?`, [queryData.id], function (error2, topic) {
          if(error2){
            throw error2;
          }
          var title = topic[0].title;
          var description = topic[0].description;
          const authorName = topic[0].name;
          const authorProfile = topic[0].profile;
          var list = template.list(topics);
          var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}
            <p>${authorName} : ${authorProfile}</p>`,
            `<a href="/create">create</a>
            <a href="/update?id=${queryData.id}">update</a>
            <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${queryData.id}">
            <input type="submit" value="delete">
            </form>`
          );
          response.writeHead(200);
          response.end(html);
      });
      });
}

exports.create = function(request, response){
    connection.query('SELECT * FROM topic', function (error, topics) {
        if (error) {
            console.log(error);
        }
        connection.query(`SELECT * FROM author`, (err2, authors)=> {
          if (err2){
            throw err2;
          }
          var title = 'WEB - create';
          var list = template.list(topics);
          const author_list = template.author_list(authors);
          var html = template.HTML(title, list,
            `
            <form action="/create_process" method="post">
              <p><input type="text" name="title" placeholder="title"></p>
              <p>
                <textarea name="description" placeholder="description"></textarea>
              </p>
              ${author_list}
              <p>
                <input type="submit">
              </p>
            </form>
          `,`<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);

        })
        
    });
}

exports.create_process = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          connection.query(`INSERT INTO topic (title, description, created, author_id) 
          VALUES(?, ?, NOW(), ?) `,
          [post.title, post.description, post.author_id], 
          function(err, result){
            if(err){
              throw err;
            }
            response.writeHead(302, {Location: `/?id=${result.insertId}`});
            response.end();
          }) 
      });
}

exports.update = function(request, response, queryData){
    connection.query('SELECT * FROM topic', function (error, topics) {
        if (error) {
            throw error;
        }
        connection.query(`SELECT * FROM topic where id = ?`,[queryData.id], (err2, result) => {
          if (err2) {
            throw err2;
          }
          connection.query(`SELECT * FROM author`, (err3, authors)=> {
            if (err3){
              throw err2;
            }
            const id = result[0].id;
            let title = result[0].title;
            let description = result[0].description;
            const author_list = template.author_list(authors, result[0].author_id);
            var list = template.list(topics);
            console.log(result[0].author_id)
            var html = template.HTML(title, list,
            `
            <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${id}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            ${author_list}
            <p>
              <input type="submit">
            </p>
          </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${id}">update</a>`
        );
        response.writeHead(200);
          response.end(html);
          })
          
        })
    });
      
}

exports.update_process = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          connection.query(`UPDATE topic SET  
          title =  ?,
          description = ?
          WHERE id = ? 
          `, 
          [post.title, post.description, post.id], 
          function(err, result){
            if(err){
              throw err;
            }
            response.writeHead(302, {Location: `/?id=${post.id}`});
            response.end();
          }) 
      });
}

exports.delete = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          connection.query(`DELETE FROM topic WHERE id = ? `, 
          [post.id], 
          function(err, result){
            if(err){
              throw err;
            }
            response.writeHead(302, {Location: `/`});
            response.end();
          }) 
      });
}