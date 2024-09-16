const express = require('express');
const Sequelize = require('sequelize')
const app = express()

const POSTGRES_CONNECTION_STRING = "postgres://postgres:postgrespassword@localhost:5432/postgres";

app.use(express.json());

app.post("/blog_post_event", async (req, res) => {

    let type;

    if (req.body.event.op === "INSERT") {
        type = "created";
    } else if (req.body.event.op === "UPDATE") {
        if (req.body.event.data.old.is_published === true && req.body.event.data.new.is_published === false) {
            type = "unpublished";
        } else if (req.body.event.data.old.is_published === false && req.body.event.data.new.is_published === true) {
            type = "published";
        }
    }

    if (type) {
        const blogPostId = req.body.event.data.new.id
        const sequelize = new Sequelize(POSTGRES_CONNECTION_STRING, {})

        await sequelize.query("INSERT INTO blog_post_activity(blog_post_id, type) values (:blogPostId,:type);", { replacements: { blogPostId, type } })
    }
    res.status(200)

})

app.post("/archive_posts", async (req, res) => {
    const sequelize = new Sequelize(POSTGRES_CONNECTION_STRING, {});
    const { age_in_second } = req.body.input;

    const [results, metadata] = await sequelize.query(
        `UPDATE blog_post SET is_published = false WHERE date < now() - INTERVAL '${age_in_second} second'`
    );

    res.status(200).json({
        count: metadata.rowCount
    });
});

app.listen(8000, () => {
    console.log("SERVER IS LISTENING PORT 8000");
});