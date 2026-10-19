function Message({ message, children }) {
  return (
    <div className="message">
      <p>{message}</p>
      {children}
    </div>
  );
}

export default Message;
