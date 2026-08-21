import { showcaseModels } from "../src/lib/models";
import { polylinesForModel } from "../src/lib/wire-geometry";

const payload = showcaseModels.map((model) => ({
  id: model.id,
  polylines: polylinesForModel(model.id),
}));

process.stdout.write(JSON.stringify(payload));
