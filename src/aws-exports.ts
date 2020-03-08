export default {
    Auth: {
      mandatorySignIn: true,
      region: "eu-west-2",
      userPoolId: "eu-west-2_FsOXNYlT4",
      identityPoolId: "eu-west-2:0c44a4ad-582f-400b-b011-6eb102fc96e7",
      userPoolWebClientId: "6t5k9b77hlkq7ojtg5m4ipt2ap"
    },
    Storage: {
      region: "eu-west-2",
      bucket: "sylva-notes-app-uploads",
      identityPoolId: "eu-west-2:0c44a4ad-582f-400b-b011-6eb102fc96e7"
    },
    API: {
      endpoints: [
        {
          name: "notes",
          endpoint: "https://mv7t3usboj.execute-api.eu-west-2.amazonaws.com/prod",
          region: "eu-west-2"
        },
      ]
    }
  };