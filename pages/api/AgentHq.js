export default async function handler(req, res) {
  let inputData = req.body.inputData;
  try {
    let response = await getServerSideProps({ query: { inputData } });
    res.status(200).json({ name: "success", response });
  } catch (err) {
    res.status(201).json({ name: "error" });
  }
}

export async function getServerSideProps(context) {
  let inputData = context.query.inputData;
  try {
    let response = await fetch(
      `https://app.agent-hq.io/api/v1/agents/NlXXRN/run`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer tEqggP10cj7pgJcH-hmjlPhQpnBR_QENybl4O5sYXco`,
        },
        body: JSON.stringify({
          input: inputData,
        }),
      }
    );
    response = await response.json();
    return {
      props: {
        response,
        name: "success",
      },
    };
  } catch (err) {
    return {
      props: {
        err,
        name: "error",
      },
    };
  }
}
