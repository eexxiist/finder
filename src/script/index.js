const aside = document.querySelector(".pane_aside"),
    main = document.querySelector(".pane_main"),
    trigger = document.querySelector(".pane_trigger");

let isResizing = false,
    isHover = false,
    startX,
    initialWidth;

// aside min width = 250
// aside max width = 650
// close aside when < 100px

trigger.addEventListener("mousedown", (event) => {
    isResizing = true;
    startX = event.pageX;
    initialWidth = aside.offsetWidth;
});

trigger.addEventListener("mouseover", () => {
    isHover = true;

    if (isHover) {
        trigger.classList.add("active");
    }
});

trigger.addEventListener("mouseleave", () => {
    isHover = false;

    if (!isHover && !isResizing) {
        trigger.classList.remove("active");
    }
});

document.addEventListener("mousemove", (event) => {
    if (isResizing) {
        const newWidth =
            event.pageX <= 100
                ? 0
                : Math.min(
                      Math.max(initialWidth + (event.pageX - startX), 250),
                      650
                  );

        aside.style.width = newWidth + "px";
        main.style.width = `calc(100% - ${newWidth}px)`;
        trigger.style.left = `calc(${newWidth}px - 2px)`;
    }
});

document.addEventListener("mouseup", () => {
    isResizing = false;

    if (!isHover) {
        trigger.classList.remove("active");
    }

    console.log("Mouse up");
});







function generateFolderName() {
    const prefixes = [
        "Awesome",
        "Creative",
        "Dynamic",
        "Innovative",
        "Fantastic",
    ];
    const suffixes = [
        "Projects",
        "Solutions",
        "Ideas",
        "Ventures",
        "Creations",
    ];

    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return `${randomPrefix} ${randomSuffix}`;
}

function generateRandomType() {
    const fileTypes = [
        'jpg',
        'png',
        'pdf',
        'mp3',
        'mp4',
        'docx'
    ],
        veriety = Math.floor(Math.random() * 2); // 1 - file, 0 - dir

    if(veriety){
        return fileTypes[Math.floor(Math.random() * fileTypes.length)]
    }else{
        return 'dir';
    }
}






// Generate structure
function generateFolderStructure(rootFolder, depth, maxChildren) {
    const generateFolders = (folder, currentDepth) => {
        if (currentDepth >= depth) {
            return [];
        }

        const numChildren = Math.floor(Math.random() * maxChildren);
        const children = Array.from({ length: numChildren }, (_, index) => {
            const name = generateFolderName();
            const type = generateRandomType();

            const child = {
                name,
                type
            };

            if(type === 'dir'){
                child.children = generateFolders(name, currentDepth + 1);
            }


            return child;
        });

        return children;
    };

    return {
        name: rootFolder,
        type: 'dir',
        children: generateFolders(rootFolder, 0),
    };
}


const data = generateFolderStructure('Root', 3, 6);
console.log(data)


// function createFolderView(data, parentElement) {
//     const ul = document.createElement('ul');
//     parentElement.appendChild(ul);

//     data.children.forEach(child => {
//       const li = document.createElement('li');
//       ul.appendChild(li);

//       const folderName = document.createElement('span');
//       folderName.textContent = child.name.split('/').pop();
//       folderName.className = 'folder';
//       li.appendChild(folderName);

//       if (child.children.length > 0) {
//         createFolderView(child, li);
//       }

//       folderName.addEventListener('click', () => {
//         const sublist = li.querySelector('ul');
//         if (sublist) {
//           sublist.style.display = sublist.style.display === 'none' ? 'block' : 'none';
//         }
//       });
//     });
//   }

//   const folderView = document.getElementById('folderView');
//   createFolderView(folderData, folderView);
