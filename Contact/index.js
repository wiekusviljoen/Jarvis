import Loader from "react-loaders";

import "./index.scss";
import emailjs from "@emailjs/browser";

const Contact = () => {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_z4x1kcc",
        "template_z1sy47v",
        e.target,
        "FWX0PEsQrtPVUpbiN"
      )
      .then(
        () => {
          alert("Message successfully sent");
        },
        () => {
          alert("Failed to send the message,please try again");
        }
      );
  }

  return (
    <>
      <form
        className="contact-form"
        style={{ margin: "25px 85px 75px 100px" }}
        onSubmit={sendEmail}
      >
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
        />

        <input
          type="email"
          name="user_mail"
          className="form-control"
          placeholder="Email"
        />

        <textarea
          name="message"
          rows="4"
          className="form-control"
          placeholder="Please do not hesitate to contact me and tell me what you think about my website."
        />
        <input
          type="submit"
          value="Send"
          className="form-control btn btn-primary"
          style={{ marginTop: "30px" }}
        />
      </form>
      <Loader type="pacman" />{" "}
    </>
  );
};

export default Contact;
