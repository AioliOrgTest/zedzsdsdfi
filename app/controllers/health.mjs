import { allHealthResponse, localHealthResponse, remoteHealthResponse } from '../../lib/health/healthManager.mjs';

export async function healthAll(req, resp) {
  const res = await allHealthResponse();
  resp.json(res);
}

export async function localHealth(req, resp) {
  const res = await localHealthResponse();
  resp.json(res);
}

export async function remoteHealth(req, resp) {
  const res = await remoteHealthResponse();
  resp.json(res);
}