module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <h3><a href="/author">author</a></h3>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(topics){
    var list = '<ul>';
    var i = 0;
    while(i < topics.length){
      list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },author_list:function(authors, selected_author = -1){
    let author_list = `<select name="author_id">`;
    let i = 0;
    while(i < authors.length){
      if ( parseInt(selected_author)  === authors[i].id){
        author_list = author_list + `<option selected value=${authors[i].id}>${authors[i].name}</option>`;
      }
      else{
        author_list = author_list + `<option value=${authors[i].id}>${authors[i].name}</option>`;
      }
      i = i+1;
    }
    author_list = author_list + `</select>`;
    return author_list;
  }, author_table: function(authors){
    let authorList = `
    <table border="1">
        <th>title</th>
        <th>profile</th>
        <th>update</th>
        <th>delete</th>    
    `
    let i = 0;
    while (i < authors.length){
        authorList = authorList + `
        <tr>
            <td>${authors[i].name}</td>
            <td>${authors[i].profile}</td>
            <td><a href="/author/update?id=${authors[i].id}">update</a></td>
            <td>
                <form action="author/delete_process" method="post">
                <input type="hidden" name="id" value="${authors[i].id}">
                <input type="submit" value="delete">
                </form>
            </td>
        </tr>
        `
        i = i + 1;
    }
    authorList = authorList + `</table>`;
    return authorList;
  }
}
