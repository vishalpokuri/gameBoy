import QueueComponent from "../components/QueueComponent";

function QueueScreen() {
  return (
    <>
      <QueueComponent
        name="Repair Kit"
        index={1}
        startTime="9:07 AM"
        endTime="9:17AM"
        progress={75}
        remainingTime={9}
      />
      <QueueComponent
        name="Repair Kit"
        index={1}
        startTime="9:07 AM"
        endTime="9:17AM"
        progress={75}
        remainingTime={9}
      />
      <QueueComponent
        name="Repair Kit"
        index={1}
        startTime="9:07 AM"
        endTime="9:17AM"
        progress={75}
        remainingTime={9}
      />
      <QueueComponent
        name="Repair Kit"
        index={1}
        startTime="9:07 AM"
        endTime="9:17AM"
        progress={75}
        remainingTime={9}
      />{" "}
    </>
  );
}

export default QueueScreen;
