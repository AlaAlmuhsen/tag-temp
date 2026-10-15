import Button from "./Button";

function BackButton() {
  // TODO: go back one step in the browser history → navigate(-1)
  //       navigate comes from useNavigate()
  //       HINT: this button is also used inside a <form>. Don't submit it!
  return <Button type="back">&larr; Back</Button>;
}

export default BackButton;
