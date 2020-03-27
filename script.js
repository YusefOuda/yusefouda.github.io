window.onload = () => {
    let text = `~Hi there!~ My name is Yusef Ouda.~\n\nI am a software developer.~\n\nFind out more about me on `;
    let textNode = document.createTextNode("");
    document.getElementById("container").insertBefore(textNode, document.getElementById("cursor"));
    var skip = false;
    printText(text, textNode, 0);
    
    window.addEventListener('click', function() {
        skip = true;
        document.getElementById("skip").style.visibility = "hidden";
    });

    function printText(text, node, i) {
        let delay = 90;
        const char = text[i];
        if (char === "~")
            delay = 750;
        if (skip) delay = delay / 20;
        node.innerText += char;
        setTimeout(() => {
            if (char === "\n") {
                node = document.createTextNode("");
                document.getElementById("container").insertBefore(document.createElement("br"), document.getElementById("cursor"));
                document.getElementById("container").insertBefore(node, document.getElementById("cursor"));
            }
            else if (char !== "~") {
                node.nodeValue = node.nodeValue + char;
            } if (++i < text.length) {
                printText(text, node, i);
            } else {
                insertLink();
            }
        }, delay);
    }

    function insertLink() {
        let text = "Stack Overflow.";
        let textNode = document.createElement("a");
        textNode.href = "https://stackoverflow.com/cv/yusefouda";
        document.getElementById("container").insertBefore(textNode, document.getElementById("cursor"));
        printLink(text, textNode, 0);
    }

    function printLink(text, node, i) {
        let delay = 90;
        if (skip) delay = delay / 20;
        const char = text[i];
        node.innerText += char;
        setTimeout(() => {
            node.nodeValue = node.nodeValue + char;

            if (++i < text.length)
                printLink(text, node, i);
            else
                document.getElementById("skip").style.visibility = "hidden";
        }, delay);
    }
}
