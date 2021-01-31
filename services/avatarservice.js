class AvatarService {
    async upload(file, token){
        const urlResponse = await fetch('https://sync.broodrooster.dev/api/v2/files/put/avatar.jpg',
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
    async delete(token){
        const urlResponse = await fetch('https://sync.broodrooster.dev/api/v2/files/delete/avatar.jpg',
        {
            method: 'DELETE',
            headers: {
                'Authorization': token
              },
        });
        if(urlResponse.status == 200){
            alert('Deleted succesfully');
        } else {
            return;
        }
    }
}

export default new AvatarService();