import t from "tap";
import { server } from "../app";

const { test } = t;

test("shoulds return fines list", async t => {
  t.teardown(async () => {
    await server.close()
  });

  const resp = await server.inject({
    method: "GET",
    path: '/fines'
  })

  t.same(resp.statusCode, 200)
});