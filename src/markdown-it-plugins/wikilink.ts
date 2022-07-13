import { isSpace, normalizeReference } from "markdown-it/lib/common/utils";
import StateInline from "markdown-it/lib/rules_inline/state_inline";
import { win32, basename, dirname, extname, isAbsolute, join, normalize, relative } from "path";
import { readdirSync, statSync } from "fs";

function getAllFiles(path: string): string[] {
    let ret: string[] = [];
    const files = readdirSync(path);
    for (let filePath of files) {
        const absolutePath = join(path, filePath);
        const stat = statSync(absolutePath);
        if (stat.isDirectory()) {
            ret = ret.concat(getAllFiles(absolutePath));
        }
        else if (stat.isFile() && extname(filePath) == ".md") {
            ret.push(absolutePath);
        }
    }
    return ret;
}

function getLink(link: string, filePath: string) {
    const rootPath = join(__dirname, "../../../../");
    const files = getAllFiles(rootPath);
    let toFilePath: string = link;
    if (link.includes("/")) {
        if (link.startsWith("."))
            toFilePath = link;
        else {
            let res = files.find((path) => {
                return path === join(rootPath, link);
            })
            if (res === undefined) {
                toFilePath = "./" + link;
            }
            else {
                toFilePath = join(relative(dirname(filePath), join(rootPath, link)));
            }
        }
    }
    else {
        let res = files.find((path) => {
            return basename(path) === link;
        });
        if (res === undefined) toFilePath = link;
        else toFilePath = join(relative(dirname(filePath), dirname(res)), basename(res));
    }
    return join(dirname(toFilePath), basename(toFilePath));
}


export function wikilink(md) {
    md.inline.ruler.before("link", "wikilink", function (state: StateInline, silent: boolean) {
        let wikilinkPattern = /\[\[(?<path>(?:[^|])*)?(?:\|(?<title>[^|]*?))?\]\]/y;

        wikilinkPattern.lastIndex = state.pos;

        let match = wikilinkPattern.exec(state.src);

        if (match === null || match.groups?.path === undefined) return false;

        if (!silent) {
            let labelStart = state.pos + 2;
            let labelEnd = state.pos + match[0].length;
            let token = state.push("link_open", "a", 1);
            let { path, title } = match.groups;
            path = path.replace(/.md$/, "");
            token.attrs = [["href", getLink(path + ".md", state.env.filePath)]];
            if (title !== undefined) {
                token.attrs.push(["title", title]);
            }
            token = state.push("text", "", 0);
            token.content = title ? title : path;
            token = state.push("link_close", "a", -1);
        }

        //
        // We found the end of the link, and know for a fact it's a valid link;
        // so all that's left to do is to call tokenizer.
        //
        // if (!silent) {
        //     state.pos = labelStart;
        //     state.posMax = labelEnd;

        //     token = state.push('link_open', 'a', 1);
        //     token.attrs = [['href', href]];
        //     if (title) {
        //         attrs.push(['title', title]);
        //     }

        //     token = state.push('link_close', 'a', -1);
        // }

        state.pos += match[0].length;
        return true;

    })
}