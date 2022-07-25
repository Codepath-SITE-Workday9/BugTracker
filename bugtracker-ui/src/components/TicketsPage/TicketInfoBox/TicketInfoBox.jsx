import {React, useState} from "react"
import "./TicketInfoBox.css"

export default function TicketInfoBox() {

    const [commentForm, setCommentForm] = useState("")
    const handleCommentSubmit = function (e) {
        e.preventDefault();
        console.log("Comment submitted!");
        console.log(commentForm)
        setCommentForm("")
      }
      
      const handleCommentOnChange = (event) => {
        setCommentForm(event.target.value)
      }

    return (
        <div className="ticket-info-box">

        <div className="header">
          <h1 className="header-text">Selected Ticket Info</h1>
        </div>
        <div className="columns">
          <div className="left-column"> {/* Left column of ticket info box */}
            <div className="info-box"> {/* All general ticket info shown here */}
              <div className="row-1">

                <div className="row-item">
                  <div className="info-row-header">Ticket Title</div>
                  <div className="info-row-content">Fix connection error</div>
                </div>

                <div className="row-item">
                  <div className="info-row-header">Ticket Author</div>
                  <div className="info-row-content">John Smith</div>
                </div>

                <div className="row-item">
                  <div className="info-row-header">Ticket Description</div>
                  <div className="info-row-content">
                    <p1>The server isn't loading properly, please fix soon.</p1>
                  </div>
                </div>

              </div>
              <div className="row-2">

                  <div className="row-item">
                    <div className="info-row-header">Status</div>
                    <div className="info-row-content">
                      <p1>In Progress</p1>
                    </div>
                  </div>

                  <div className="row-item">
                    <div className="info-row-header">Priority</div>
                    <div className="info-row-content">
                      <p1>High</p1>
                    </div>
                  </div>

                  <div className="row-item">
                    <div className="info-row-header">Category</div>
                    <div className="info-row-content">
                      <p1>Bug fix</p1>
                    </div>
                  </div>

                  <div className="row-item">
                    <div className="info-row-header">Complexity</div>
                    <div className="info-row-content">
                      <p1>5</p1>
                    </div>
                  </div>

              </div>
            </div>
            <div className="dev-box"> {/* Shows assigned devlopers to ticket */}
              <p1>Assigned Developers</p1>
              <p1>Billy Bob</p1>
              <p1>Tom Smith</p1>
              <p1>Adam Jones</p1>
              <p1>John Smith</p1>

            </div>
          </div>

          <div className="right-column"> {/* Right column of the ticket info box */}
            <div className="column-header">
              <h1>Comments</h1>
            </div>
            <div className="comments-table"> {/* Section where all comments are displayed */}

              <div className="comment">
                <div className="comment-header">
                  <p2>John Smith</p2>
                  <p2> • </p2>
                  <p2>August 20, 2022</p2>
                </div>
                <div className="comment-content">
                  <p2>Hello, please work on this issue</p2>
                </div>
              </div>

              <div className="comment">
                <div className="comment-header">
                  <p2>Bob Baker</p2>
                  <p2> • </p2>
                  <p2>August 20, 2022</p2>
                </div>
                <div className="comment-content">
                  <p2>Working on it now</p2>
                </div>
              </div>

            </div>

            <div className="comment-input"> {/* Section where user inputs their own comments */}
              <form className="input-form" onSubmit={handleCommentSubmit}>
                <input className="postComment" placeholder="Enter comment here" type="text" value={commentForm} onChange={handleCommentOnChange}>
                </input>
                <button className="submitButton">Submit</button>
              </form>
       
            </div>

          </div>
        </div>
        

      </div>
    )
}