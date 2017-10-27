import { sequence } from "../helpers"

const external = sequence<{ newTitle: string }, { test: string }>(x => x
  .action("Here", () => {
    console.log('here');
    return { test: "something" };
  })
);

export { external }