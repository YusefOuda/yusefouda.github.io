window.onload = () => {
    let text = `~Hi there! 👋~ My name is Yusef Ouda.~\n~\n~I am a software developer based in Austin, Texas.~\n~\n~Find out more about me on [LinkedIn](https://linkedin.com/in/yusefouda) or [GitHub](https://github.com/YusefOuda).`;
    let textNode = document.createTextNode("");

    const containerNode = document.getElementById("container");
    const cursorNode = document.getElementById("cursor");
    const skipNode = document.getElementById("skip");

    containerNode.insertBefore(textNode, cursorNode);
    let skip = false;

    printText(text, textNode, 0);
    
    window.addEventListener('click', function() {
        skip = true;
        skipNode.style.visibility = "hidden";
    });

    function printText(text, node, i) {
        let delay = 50;
        const char = text[i];
        if (char === "~")
            delay = 400;
        if (skip) delay = 0;
        node.innerText += char;
        setTimeout(() => {
            if (char === "\n") {
                node = document.createTextNode("");
                containerNode.insertBefore(document.createElement("br"), cursorNode);
                containerNode.insertBefore(node, cursorNode);
            }
            else if (char === "[") {
                text = insertLink(text, i);
                node = document.createTextNode("");
                containerNode.insertBefore(node, cursorNode);
            } else if (char !== "~") {
                node.nodeValue = node.nodeValue + char;
            }
            
            if (++i < text.length) {
                printText(text, node, i);
            } else {
                skipNode.click();
            }
        }, delay);
    }

    function insertLink(text, i) {
        const start = i+1;
        const end = text.substring(i+1).indexOf("]") + start;
        const linkText = text.substring(start, end);
        const urlStart = text.indexOf("(", end) + 1;
        const urlEnd = text.indexOf(")", end);
        const linkUrl = text.substring(urlStart, urlEnd);
        let aNode = document.createElement("a");
        aNode.href = linkUrl;
        aNode.innerText = linkText;
        aNode.target = "_blank";
        containerNode.insertBefore(aNode, cursorNode);
        text = text.replace(text.substring(start-1, urlEnd), "");
        return text;
    }

}
