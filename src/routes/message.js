import { Router } from 'express';
var cmd = require('node-cmd');

const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

router.get('/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/', (req, res) => {
  const url = req.body.url.join(' ');
  const path = process.env.PYTHON_PATH + ' ';
  cmd.run(path + url, function (err, data, stderr) {
    if (err) return res.status(400).json({ error: err });
    data = data.split(/[\n+\r+]/g).filter((n) => n);
    const result = JSON.stringify({ result: data });
    return res.send(result);
  });
});

router.delete('/:messageId', (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } =
    req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

export default router;
