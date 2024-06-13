import express from "express";
import bodyParser from "body-parser";
import ejs, { localsName } from "ejs";
import methodOverride from "method-override";


const app = express();
const port = 3000;




app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))
app.set("view engine", "ejs");
app.use(express.static('public'));


/** User should be create new posts.
 * The home page should allow them to see all posts.
 * The user should be able to Update or Delete posts as needed.
 * Should be style well to ensure a good user experience
 */

const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Suscipit adipiscing bibendum est ultricies integer. Tempus urna et pharetra pharetra massa massa ultricies."

const blogs = [
    {
        title: 'Cupcake Ipsum 1',
        textArea: 'Topping cheesecake pudding brownie pie. Bonbon chocolate topping soufflé apple pie icing pastry donut halvah. Brownie muffin tart tart candy canes jelly-o toffee jelly beans fruitcake. Tiramisu sweet candy pastry cupcake chocolate cake ice cream lemon drops topping. Bear claw icing tiramisu bear claw cheesecake chocolate icing. Chupa chups gummi bears pie ice cream wafer sweet roll lollipop. Sweet shortbread tootsie roll apple pie caramels wafer. Gingerbread jelly-o brownie dessert sugar plum. Oat cake toffee soufflé jujubes apple pie tart. Halvah jelly-o chocolate bar danish soufflé cookie liquorice. Cheesecake pudding bear claw dragée dragée cake. Candy canes lollipop gummies cake lemon drops.'
      },
      {
        title: 'Cupcake Ipsum 2',
        textArea: 'Lollipop candy canes muffin sesame snaps donut danish liquorice toffee. Cupcake marzipan gummies gummi bears jujubes. Jelly-o pastry bonbon toffee danish chocolate bar bear claw. Toffee chocolate cake apple pie sugar plum croissant pudding cheesecake chocolate sweet roll. Lollipop candy cake halvah dragée candy tart jujubes pudding. Jelly sesame snaps icing toffee sesame snaps danish jelly biscuit. Jelly beans fruitcake tootsie roll liquorice sugar plum candy. Tiramisu icing shortbread topping macaroon chocolate cake jelly sweet roll shortbread. Fruitcake lollipop muffin donut cupcake jujubes croissant sweet roll. Marzipan lollipop marzipan marzipan bonbon. Sesame snaps powder sugar plum cake ice cream powder. Lemon drops shortbread dragée jujubes soufflé. Candy dragée chocolate gummies cake jelly-o pie sesame snaps.'
      },
      {
        title: 'Pirates Ipsum 1',
        textArea: 'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crows nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.' 
      },
      {
        title: 'Pirates Ipsum 2',
        textArea: 'Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.' 
      }
];


app.get("/view-posts/:title", (req, res) => {
    const requestedPostID = req.params.title;

    const blogPost = blogs.find((post) => post.title === 
    requestedPostID);

    if(blogPost) {
        res.render("view-posts.ejs", { title: blogPost.title, textArea: blogPost.textArea});
    } else {
        res.status(404).send("Blog post not found");
    }

});


app.get("/update-post/:title", (req, res) => {
    const requestedPostID = req.params.title;
    console.log(requestedPostID);

    const blogPost = blogs.find((post) => post.title === 
    requestedPostID);

    if(blogPost) {
        res.render("update-post.ejs", { title: blogPost.title, textArea: blogPost.textArea});
    } else {
        res.status(404).send("Blog post not found");
    }
});


app.post("/update-post/:title", (req, res) => {
    const requestedPostID = req.params.title;
    const updatedTitle = req.body.title;
    const updatedTextArea = req.body.textArea;

    const blogPost = blogs.find((post) => post.title === 
    requestedPostID);

    if(blogPost) {
        blogPost.title = updatedTitle;
        blogPost.textArea = updatedTextArea;

        res.redirect("/");
    } else {
        res.status(404).send("Blog post not found");
    }
});

app.get("/delete-post/:title", (req, res) => {
    const requestedPostID = req.params.title;
    const updatedTitle = req.body.title;
    const updatedTextArea = req.body.textArea;
    console.log(requestedPostID);

    const blogPost = blogs.find((post) => post.title === 
    requestedPostID);

    if(blogPost) {
        blogPost.title = updatedTitle;
        blogPost.textArea = updatedTextArea;

        res.redirect("/");
        } else {
        res.status(404).send("Blog post not found");
    }
    
});


app.delete("/delete-post/:title", (req, res) => {
    const requestedPostID = req.params.title;
    const updatedTitle = req.body.title;
    const updatedTextArea = req.body.textArea;
    console.log(requestedPostID);

    const blogPost = blogs.find((post) => post.title === 
    requestedPostID);

    if(blogPost) {
        res.render("/");
    } else {
        res.status(404).send("Blog post not found");
    }
    res.redirect("/");

});


app.get("/", (req, res) => {    
    res.render("index.ejs", { blogs });
});

app.post("/", (req, res) => {
    const { title, textArea } = req.body;

    if(title && textArea) {
        const blogPost = {
            title,
            textArea
        };
        blogs.push(blogPost);
        res.redirect("/");
    } else {
        res.status(404).send("Title and texArea required")
    }
});

app.get("/login", (req, res) => { 
    const password = req.body["password"];   
    res.render("login.ejs");
});



app.get("/new-post", (req, res) => {
    res.render("new-post.ejs");

});


app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});