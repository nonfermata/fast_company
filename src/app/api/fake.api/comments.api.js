const comments = [
    {
        _id: "67rdca3eeb7f6fg",
        pageId: "67rdca3eeb7f6fgeed471815",
        userId: "67rdca3eeb7f6fgeed471824",
        content: "Accusamus aperiam aspernatur commodi consequatur deleniti dolore dolorem!",
        created_at: "1668452520954"
    },
    {
        _id: "67rdca3eeb7f6fgdasd",
        pageId: "67rdca3eeb7f6fgeed471815",
        userId: "67rdca3eeb7f6fgeed47181r",
        content: "Ad consequatur delectus doloribus ea expedita ipsa iste molestiae neque omnis vero?",
        created_at: "1619573058538"
    },
    {
        _id: "67rdca3eeb7f6fgdaasd",
        pageId: "67rdca3eeb7f6fgeed471817",
        userId: "67rdca3eeb7f6fgeed471823",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        created_at: "1660470815427"
    },
    {
        _id: "63rdca3web7f6fgdaasp",
        pageId: "67rdca3eeb7f6fgeed471817",
        userId: "67rdca3eeb7f6fgeed471822",
        content: "Odio possimus repudiandae tenetur ullam vel voluptatibus.",
        created_at: "1632351058523"
    }
];
if (!localStorage.getItem("comments")) {
    localStorage.setItem("comments", JSON.stringify(comments));
}
const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(comments);
        }, 200);
    });

const fetchCommentsForUser = (userId) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(
                JSON.parse(localStorage.getItem("comments")).filter(
                    (c) => c.pageId === userId
                )
            );
        }, 200);
    });
const add = (data) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const comments = JSON.parse(localStorage.getItem("comments"));
            const newComment = {
                ...data,
                created_at: Date.now(),
                _id: Math.random().toString(36).substr(2, 9)
            };
            comments.push(newComment);
            localStorage.setItem("comments", JSON.stringify(comments));
            resolve(newComment);
        }, 200);
    });

const remove = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const comments = JSON.parse(localStorage.getItem("comments"));
            const newComments = comments.filter((x) => x._id !== id);
            localStorage.setItem("comments", JSON.stringify(newComments));
            resolve(id);
        }, 200);
    });
export default {
    fetchAll,
    fetchCommentsForUser,
    add,
    remove
};
