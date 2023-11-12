import t from "tap";
import { server } from "../app";

const { test } = t;

test("shoulds return warnings list", async t => {
  t.teardown(async () => {
    await server.close()
  });

  const resp = await server.inject({
    method: "GET",
    path: '/warnings'
  })

  t.same(resp.statusCode, 200)
});