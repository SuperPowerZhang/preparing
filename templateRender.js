// 第四版
// temp是为了测试的 否则应该取模版中的html片段
// 可以看：https://github.com/mqyqingfeng/Blog/issues/63
const temp = `<%for ( var i = 0; i < users.length; i++ ) { %>
  <li>
      <a href="<%=users[i].url%>">
          <%=users[i].name%>
      </a>
  </li>
<% } %>`;
var compiled = tmpl('user_tmpl');
// 为了测试

function tmpl(str, data) {
  // 为了测试
  var str = temp;
  // var str = str || document.getElementById(str).innerHTML;
  var fn = new Function(
    'obj',

    "var p = []; with(obj){p.push('" +
      str
        .replace(/[\r\t\n]/g, '')
        .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
        .replace(/<%/g, "');")
        .replace(/%>/g, "p.push('") +
      "');}return p.join('');"
  );

  var template = function (data) {
    return fn.call(this, data);
  };
  return template;
}

// 使用时
var data = {
  users: [
    { name: 'Kevin', url: 'http://localhost' },
    { name: 'Daisy', url: 'http://localhost' },
    { name: 'Kelly', url: 'http://localhost' }
  ]
};

console.log(1111, compiled(data));
// results.innerHTML = compiled(data);
