import React from 'react';

const Package = () => (
    <section className="packages">
        <ul className="grid">
            <li>
                <i className="fas fa-plus-circle fa-4x"></i>
                <h4>Easy Creation</h4>
                <p>Making your own style template with unlimited elements can not be more simple.<br></br> Even children can make new form templates
                </p>
            </li>
            <li>
                <i className="fas fa-file-export fa-4x"></i>
                <h4>Synchronous Forms</h4>
                <p>After you have submitted your template, a new form is automatically sent to 
                    <br></br>user side and ready to be served 
                </p>
            </li>
            <li>
                <i className="far fa-paper-plane fa-4x"></i>
                <h4>Approval Notification</h4>
                <p>The form after user submission is set to pending. 
                 <br></br>A notification email is then sent to a manager.
                </p>
            </li>
            <li>
                <i className="fas fa-mobile-alt fa-4x"></i>
                <h4>Mobile Friendly</h4>
                <p>This application is designed to support well-known mobile web browers.
                    <br></br>Now you can submit forms without your laptops
                </p>
            </li>
        </ul>
    </section>
)

export default Package;