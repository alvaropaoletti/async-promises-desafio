import test from "ava";
import { ContactsCollection } from "./models";
import * as contactsObject from "./contacts.json";
import * as jsonfile from "jsonfile";

test.serial("Testeo el load del modelo", (t) => {
  const model = new ContactsCollection();
  return model.load().then(() => {
    t.deepEqual(model.getAll(), contactsObject);
  });
});

test.serial("Testeo el addOne del modelo", (t) => {
  const model = new ContactsCollection();
  const mockContact = {
    id: 30,
    name: "Marce",
  };
  model.addOne(mockContact);
  t.deepEqual(model.getAll(), [mockContact]);
});

test.serial("Testeo el save del modelo", (t) => {
  const model = new ContactsCollection();
  return model.load().then(() => {
    const mockContact = {
      id: 30,
      name: "Marce",
    };
    model.addOne(mockContact);
    return model.save().then(() => {
      return jsonfile.readFile(__dirname + "/contacts.json").then((json) => {
        t.deepEqual(json, model.getAll());
      });
    });
  });
});

test.serial("Testeo el getOneById del modelo", (t) => {
  const model = new ContactsCollection();
  const mockContact = {
    id: 31,
    name: "Marce",
  };
  model.addOne(mockContact);
  const one = model.getOneById(31);
  t.deepEqual(one, mockContact);
});
