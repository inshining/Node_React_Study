const connection = require('./db');
const template = require('./template');
var qs = require('querystring');

module.exports = {
    index: function(request, response){
    connection.query('SELECT * FROM topic', function (error, topics) {
        if (error) {
            console.log(error);
        }
        connection.query('SELECT * FROM author', function (error2, authors){
            if (error2){
                throw error2;
            }
            var title = 'Author List';
            let authorTable = template.author_table(authors);
            var list = template.list(topics);
            var html = template.HTML(title, list,
              `<h2>${title}</h2>${authorTable}
              <form action="/author/create_process" method="post">
              <p><input type="text" name="name" placeholder="name"></p>
              <p>
                <textarea name="profile" placeholder="profile"></textarea>
              </p>
              <p>
                <input type="submit" value="create">
              </p>
            </form>
              `,
              ``
            );
            response.writeHead(200);
            response.end(html);
        })
        
    });
    }, create_process:function(request, response){
        var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          connection.query(`INSERT INTO author (name, profile) 
          VALUES(?, ?) `,
          [post.name, post.profile], 
          function(err, result){
            if(err){
              throw err;
            }
            response.writeHead(302, {Location: `/author`});
            response.end();
          }) 
      });
    }, update:function(request, response, queryData){
        connection.query('SELECT * FROM topic', function (error, topics) {
            if (error) {
                throw error;
            }
            connection.query(`SELECT * FROM author`, (err2, authors)  => {
                if (err2) {
                    throw err2;
                }
            connection.query(`SELECT * FROM author where id = ?`,[queryData.id], (err2, result) => {
              if (err2) {
                throw err2;
              }
                let authorTable = template.author_table(authors);

                const title = 'Author Update';
                const id = result[0].id;
                let name = result[0].name;
                let profile = result[0].profile;
                var list = template.list(topics);
                var html = template.HTML(title, list,
                `
                ${authorTable}
                <form action="/author/update_process" method="post">
                <input type="hidden" name="id" value="${id}">
                <p><input type="text" name="name" placeholder="name" value="${name}"></p>
                <p>
                  <textarea name="profile" placeholder="profile">${profile}</textarea>
                </p>
                <input type="submit" value="update">

              </form>
                `,
                ``
            );
            response.writeHead(200);
              response.end(html);
              
            })
        })
        });
    }, update_process:function(request, response){
        var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          connection.query(`UPDATE author SET  
          name =  ?,
          profile = ?
          WHERE id = ? 
          `, 
          [post.name, post.profile, post.id], 
          function(err, result){
            if(err){
              throw err;
            }
            response.writeHead(302, {Location: `/author`});
            response.end();
          }) 
      });
    }, delete_process:function(request, response){
        var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
            connection.query(`DELETE FROM topic WHERE author_id = ?`, [post.id], function(err1, topics){
                if(err1){
                    throw err1;
                }
                connection.query(`DELETE FROM author WHERE id = ? `, 
                [post.id], 
                function(err2, result){
                    if(err2){
                    throw err2;
                    }
                    response.writeHead(302, {Location: `/author`});
                    response.end();
                }) 
            })

          
      });
    }
}
