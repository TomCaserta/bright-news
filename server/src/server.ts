require('dotenv').config();
import 'reflect-metadata';
import App from './app';
const PORT = process.env.PORT || 3000;

import { createConnection } from 'typeorm';
import { getSources, findArticles, updateExisting } from './news-sync';

async function main() { 
    try {
        const connection = await createConnection()
        
        console.log('Connected to the db.');
        const app = new App();
        app.initialize();

        app.defaultApp.listen(PORT, () => {
            console.log('Express server listening on port ' + PORT);
        });

        // Start news API requests.
        // TODO: Don't put this on the webserver side. But hey
        // who am I kidding. This will literally NEVER change.
        await updateExisting(connection);
        await getSources(connection);
        findArticles(connection);
    }
    catch (error) {
        console.log(error)
    }
}

main();