const { MAILCHIMP_AUTH: secret } = process.env;

// Signatory: 676718b634
// Toolkit: af21b808ad
// Newsletter: 170682c0eb


export default async (req, res) => {
  // let listId = "a5bb031f9f";

  try {
    const response = await fetch(
      `https://us13.api.mailchimp.com/3.0/lists/${req.body.audienceId}/members`,
      // `https://us13.api.mailchimp.com/3.0/lists/${listId}/segments/${segmentId}/members`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `api_key ${secret}`, // REFER TO THE VARIABLE HERE
        },
        body: JSON.stringify({
          email_address: req.body.email,
          status: req.body.status,
          // status: "pending",
          // merge_fields: {
          //   "FNAME": "Samuel"
          // }
          merge_fields: req.body.merge_fields,
          // interests: req.body.interests
          // interests: {
          //   "170682c0eb": true
          // }
        }),
      }
    )
    .then((response) => response.json())
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(400).json(data);
    })
  } catch {}
};