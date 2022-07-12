//transport @ header to <h1>header</h1>
//https://github.com/mqyqingfeng/Blog/issues/254#:~:text=%E5%AE%9E%E7%8E%B0%E7%9A%84%E4%BB%A3%E7%A0%81%E3%80%82-,%E5%AE%9E%E4%BE%8B%E8%AE%B2%E8%A7%A3,-%E6%8E%A5%E4%B8%8B%E6%9D%A5%E6%88%91%E4%BB%AC

function stringReplace(md) {
  md.block.ruler.before('paragraph', 'myplugin', function (state, startLine, endLine) {
    var ch, level, tmp, token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];
    ch = state.src.charCodeAt(pos);

    if (ch !== 0x40/*@*/ || pos >= max) { return false; }

    let text = state.src.substring(pos, max);
    let rg = /^@\s(.*)/;
    let match = text.match(rg);

    if (match && match.length) {
      let result = match[1];
      token = state.push('heading_open', 'h1', 1);
      token.markup = '@';
      token.map = [startLine, state.line];

      token = state.push('inline', '', 0);
      token.content = result;
      token.map = [startLine, state.line];
      token.children = [];

      token = state.push('heading_close', 'h1', -1);
      token.markup = '@';

      state.line = startLine + 1;
      return true;
    }
  })
}

export default stringReplace