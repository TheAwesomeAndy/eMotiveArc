/**
 * Local stand-in for a webhook receiver, for manual delivery testing only.
 * It is NOT a real provider and proves nothing about Resend or any vendor.
 *
 *   node tests/fixtures/mock-webhook.mjs            # listens on :4555
 *   curl localhost:4555/mode/fail                   # answer HTTP 500 from now on
 *   curl localhost:4555/mode/ok                     # answer HTTP 200 again
 *
 * Then start the site with CONTACT_WEBHOOK_URL=http://localhost:4555/hook
 * and submit the form. Received payloads are printed to this terminal only.
 */
import http from "node:http";

let mode = "ok";
http
  .createServer((req, res) => {
    if (req.url === "/mode/fail" || req.url === "/mode/ok") {
      mode = req.url.slice(6);
      return res.end(`mode=${mode}\n`);
    }
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      const secret = req.headers["x-emotivearc-secret"] ? "present" : "absent";
      console.log(`RECEIVED mode=${mode} secretHeader=${secret} bytes=${body.length}`);
      res.statusCode = mode === "fail" ? 500 : 200;
      res.end("{}");
    });
  })
  .listen(4555, () => console.log("mock webhook listening on http://localhost:4555"));
