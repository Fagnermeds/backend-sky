interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  phones: [
    {
      ddd: string;
      number: string;
    },
  ];
}

export default ICreateUserDTO;
