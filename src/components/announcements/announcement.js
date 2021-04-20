import React, { Component } from "react";
import {Announcements, Post} from '../../schema/schema';
import data from '../../testData/data.json'
import './announcements.css'

class Announcement extends Component {
    constructor(props) {
        super(props);
        this.state = {
           posts:[]
            
        }
       
    }

    componentDidMount(){
        var announcements = new Announcements();
        for (let index = 0; index < data.announcements.length; index++) {
            const post = new Post(data.announcements[index].id,data.announcements[index].title,data.announcements[index].content,data.announcements[index].date);
            announcements.addPost(post)
            
        }
        this.setState({posts: announcements.getPosts()})
      
    }
    
    render() {
        return (
            
        <div id="announcements">
            <h1>Announcemets</h1>
            <div className="postContainer">
            {
                this.state.posts.map((post)=>{
                    return(
                        <div key={post.getId()} className="post">
                            <div className="d-flex flex-row justify-content-between">
                                <h1>{post.getTitle()}</h1>
                                <p>{post.getDate()}</p>
                            </div>
                        <p>{post.getContent()}</p>
                        
                        </div>
                    )
                })
            }
            </div>
        </div>
       
       
       )
    }
}


export default Announcement;
