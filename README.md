# React Native Chunk Upload 2.x
![React-Native-Chunk-Upload](https://raw.githubusercontent.com/hossein-zare/react-native-chunk-upload/master/assets/presentation.png)

A package to bring **Chunked File Upload** / **Resumable File Upload** into **React Native**. Split a large file into multiple smaller pieces then upload them without worrying about network disconnection, even if it happens **React Native Chunk Upload** will only upload the failed chunk not the whole file!

## Changelog
In v1.x we had to first break the whole file into smaller pieces and then start uploading them.  
But in v2.x this problem has been fixed. In addition, the speed of this process has increased 10 times.

<pre><code>.digIn(<b>file</b> instead of <b>files</b>, <b>next</b>*, <b>retry</b>*, unlink);</code></pre>
You may want to take a look at the [Schema](#schema) section.

## Dependencies
⚠ Make sure the following packages are installed.

* **`react-native-fs`** https://github.com/itinance/react-native-fs
* **`rn-fetch-blob`** https://github.com/joltup/rn-fetch-blob

## Installation
* **via NPM**

    ```bash
    npm i react-native-chunk-upload
    ```
* **via Yarn**

    ```bash
    yarn add react-native-chunk-upload
    ```

## Basic Usage
```javascript
import Axios from 'axios';
import ChunkUpload from 'react-native-chunk-upload';

const chunk = new ChunkUpload({
    path: response.path, // Path to the file
    size: 10095, // Chunk size (must be multiples of 3)
    fileName: response.fileName, // Original file name
    fileSize: response.size, // Original file size

    // Errors
    onFetchBlobError: (e) => console.log(e),
    onWriteFileError: (e) => console.log(e),
});

chunk.digIn(this.upload.bind(this));

upload(file, next, retry, unlink) {
    const body = new FormData();

    body.append('video', file.blob); // param name

    Axios.post('❌ URL HERE ❌', body, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": 'application/json',

            // 💥 Choose one of the following methods:

            // 1️⃣ If you're using the wester-chunk-upload php library...
            ...file.headers,

            // 2️⃣ Customize the headers
            "x-chunk-number": file.headers["x-chunk-number"],
            "x-chunk-total-number": file.headers["x-chunk-total-number"],
            "x-chunk-size": file.headers["x-chunk-size"],
            "x-file-name": file.headers["x-file-name"],
            "x-file-size": file.headers["x-file-size"],
            "x-file-identity": file.headers["x-file-identity"]
        }
    })
        .then(response => {
            switch (response.status) {
                // ✅ done
                case 200:

                    console.log(response.data);
                    
                break;

                // 🕗 still uploading...
                case 201:
                    console.log(`${response.data.progress}% uploaded...`);

                    next();
                break;
            }
        })
        .catch(error => {
            // ❌ waddafuk? 😟
            if (error.response) {
                if ([400, 404, 415, 500, 501].includes(error.response.status)) {
                    console.log(error.response.status, 'Failed to upload the chunk.');

                    unlink(file.path);
                } else if (error.response.status === 422) {
                    console.log('Validation Error', error.response.data);
                    
                    unlink(file.path);
                } else {
                    console.log('Re-uploading the chunk...');

                    retry();
                }
            } else {
                console.log('Re-uploading the chunk...');

                retry();
            }
        });
}
```

### Wester Chunk Upload PHP Library 
If you're going to use this library, you won't need much to do...  
```javascript
// easy peasy, right? 😁
headers: {
    "Content-Type": "multipart/form-data",
    "Accept": 'application/json',

    ...file.headers
}
```
* https://github.com/hossein-zare/wester-chunk-upload

## Schema
```javascript
chunk.digIn(
    (
        file: {
            path: string,
            headers: {
                "x-chunk-number": number,
                "x-chunk-total-number": number,
                "x-chunk-size": number,
                "x-file-name": string,
                "x-file-size": number,
                "x-file-identity": string
            },
            blob: {
                name: string,
                type: string,
                uri: string
            }
        },
        next: () => void,
        retry: () => void,
        unlink: (path: string) => void
    ): void
): void;
```

## Support Us
Just star the repository, that's it! 😉