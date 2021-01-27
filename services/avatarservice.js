class AvatarService {
    async upload(file, token){
        const urlResponse = await fetch('http://127.0.0.1:8000/put/avatar.jpg',
        {
            headers: {
                'Authorization': token
              },
        });
        var uploadURL = '';
        if(urlResponse.status == 200){
            uploadURL = await urlResponse.text();
        } else {
            return;
        }

        const uploadResponse = await fetch(
            uploadURL,
            {
                method: 'PUT',
                body: file
            }
        )
        if(uploadResponse.status == 200){
            console.log('success');
        }
    }
}

export default new AvatarService();