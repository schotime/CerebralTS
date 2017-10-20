import { sequence } from "../helpers"

const external = sequence<{ newTitle: string }>(x => x
  .action("Here", () => {
    console.log('here');
  })
);

export { external }