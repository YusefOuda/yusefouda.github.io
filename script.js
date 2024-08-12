window.onload = () => {
    let text = `> ~Hi there! 👋~ My name is Yusef Ouda.~\n~\n> ~I am a software developer based in Austin, Texas.~\n~\n> ~Find out more about me on [Github](https://github.com/YusefOuda) or [contact me](mailto:contact@yusef.slmail.me).`;
    let textNode = document.createTextNode("");

    const containerNode = document.getElementById("container");
    const cursorNode = document.getElementById("cursor");
    const skipNode = document.getElementById("skip");

    containerNode.insertBefore(textNode, cursorNode);
    let skip = false;

    printText(text, textNode, 0);

    window.addEventListener('click', function () {
        skip = true;
        skipNode.style.visibility = "hidden";
    });

    async function printText(text, node, i) {
        const char = text[i];
        node.innerText += char;

        let delay = getRandomInt(30,110);
        if (char === "~")
            delay = getRandomInt(300,700);
        if (skip) delay = 0;

        await sleep(delay).then(async () => {
            if (char === "\n") {
                node = document.createTextNode("");
                containerNode.insertBefore(document.createElement("br"), cursorNode);
                containerNode.insertBefore(node, cursorNode);
            }
            else if (char === "[") {
                text = await insertLink(text, i, delay);
                node = document.createTextNode("");
                containerNode.insertBefore(node, cursorNode);
            } else if (char === ">") {
                let spanNode = document.createElement("span");
                spanNode.innerText = char;
                containerNode.insertBefore(spanNode, cursorNode);
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
        });
    }

    async function insertLink(text, i, delay) {
        let aNode = document.createElement("a");
        aNode.target = "_blank";
        containerNode.insertBefore(aNode, cursorNode);

        const start = i + 1;
        const end = text.substring(i + 1).indexOf("]") + start;
        const linkText = text.substring(start, end);
        const urlStart = text.indexOf("(", end) + 1;
        const urlEnd = text.indexOf(")", end);
        const linkUrl = text.substring(urlStart, urlEnd);
        aNode.href = linkUrl;
        let j = 0;
        while (j < linkText.length) {
            const char = linkText[j];
            await sleep(delay).then(() => {
                aNode.innerText += char;
            });
            j++;
        }
        text = text.replace(text.substring(start - 1, urlEnd), "");
        return text;
    }

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    function getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }
}
