document.getElementById('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const command = e.target.value.trim();
        processCommand(command);
        e.target.value = ''; // Efface l'input après l'envoi
    }
});

// Répertoires et fichiers simulés
let currentDirectory = "/home/utilisateur";
let directories = ["/home", "/home/utilisateur"];
let files = ["fichier1.txt", "fichier2.txt"];

function processCommand(command) {
    const output = document.getElementById('output');
    let commandParts = command.split(" ");
    let mainCommand = commandParts[0];
    let argument = commandParts[1];

    // Simuler des sorties de commandes
    if (mainCommand === 'ls') {
        output.innerHTML += '\n<span class="username">linux@linux-VirtualBox:~$</span> ' + command;
        output.innerHTML += `\nFichiers : ${files.join(' ')}\n`;
    } else if (mainCommand === 'pwd') {
        output.innerHTML += '\n<span class="username">linux@linux-VirtualBox:~$</span> ' + command;
        output.innerHTML += `\nVous êtes dans ${currentDirectory}\n`;
    } else if (mainCommand === 'clear') {
        output.innerHTML = '<span class="username">linux@linux-VirtualBox:~$</span> ';
    } else if (mainCommand === 'cd') {
        if (argument && directories.includes(argument)) {
            currentDirectory = argument;
            output.innerHTML += `\n<span class="username">linux@linux-VirtualBox:~$</span> ${command}\nRépertoire changé : ${currentDirectory}\n`;
        } else {
            output.innerHTML += `\n<span class="username">linux@linux-VirtualBox:~$</span> ${command}\nRépertoire introuvable : ${argument}\n`;
        }
    } else if (mainCommand === 'mkdir') {
        if (argument) {
            directories.push(`${currentDirectory}/${argument}`);
            output.innerHTML += `\n<span class="username">linux@linux-VirtualBox:~$</span> ${command}\nRépertoire créé : ${argument}\n`;
        } else {
            output.innerHTML += `\n<span class="username">linux@linux-VirtualBox:~$</span> ${command}\nErreur : Nom de répertoire manquant\n`;
        }
    } else if (mainCommand === 'rm') {
        if (argument && files.includes(argument)) {
            files = files.filter(file => file !== argument);
            output.innerHTML += `\n<span class="username">linux@linux-VirtualBox:~$</span> ${command}\nFichier supprimé : ${argument}\n`;
        } else {
            output.innerHTML += `\n<span class="username">linux@linux-VirtualBox:~$</span> ${command}\nFichier introuvable : ${argument}\n`;
        }
    } else if (mainCommand === 'touch') {
        if (argument) {
            files.push(argument);
            output.innerHTML += `\n<span class="username">linux@linux-VirtualBox:~$</span> ${command}\nFichier créé : ${argument}\n`;
        } else {
            output.innerHTML += `\n<span class="username">linux@linux-VirtualBox:~$</span> ${command}\nErreur : Nom de fichier manquant\n`;
        }
    } else if (mainCommand === 'echo') {
        let textToEcho = commandParts.slice(1).join(" ");
        output.innerHTML += `\n<span class="username">linux@linux-VirtualBox:~$</span> ${command}\n${textToEcho}\n`;
    } else if (mainCommand === 'help') {
        output.innerHTML += `\n<span class="username">linux@linux-VirtualBox:~$</span> ${command}\nCommandes disponibles : ls, pwd, clear, cd, mkdir, rm, touch, echo, help\n`;
    } else {
        output.innerHTML += `\n<span class="username">linux@linux-VirtualBox:~$</span> ${command}\nCommande inconnue : ${command}\n`;
    }

    // Faire défiler le terminal vers le bas
    output.scrollTop = output.scrollHeight;
}
