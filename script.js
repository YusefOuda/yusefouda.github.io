window.onload = () => {
    let text = `~Hi there! 👋~ My name is Yusef Ouda.~\n~\n~I am a software developer based in Austin, Texas.~\n~\n~Find out more about me on [LinkedIn](https://linkedin.com/in/yusefouda) or [GitHub](https://github.com/YusefOuda).`;
    let textNode = document.createTextNode("");
    document.getElementById("container").insertBefore(textNode, document.getElementById("cursor"));
    let skip = false;
    printText(text, textNode, 0);
    
    window.addEventListener('click', function() {
        skip = true;
        document.getElementById("skip").style.visibility = "hidden";
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
                document.getElementById("container").insertBefore(document.createElement("br"), document.getElementById("cursor"));
                document.getElementById("container").insertBefore(node, document.getElementById("cursor"));
            }
            else if (char === "[") {
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
                document.getElementById("container").insertBefore(aNode, document.getElementById("cursor"));
                text = text.replace(text.substring(start-1, urlEnd), "");
                node = document.createTextNode("");
                document.getElementById("container").insertBefore(node, document.getElementById("cursor"));
            } else if (char !== "~") {
                node.nodeValue = node.nodeValue + char;
            }
            
            if (++i < text.length) {
                printText(text, node, i);
            } else {
                document.getElementById("skip").click();
            }
        }, delay);
    }

}
