const cl = console.log;

function differentSamples() {
  function spreadOperatorCopy() {
    const gun = {
      damage: "12",
      weight: "34",
    };

    const healthType = {
      height: "124",
      weight: "55kg",
      color: "bluoca",
    };

    const starWardChar = {
      name: "han solo",
      species: "human",
      guns: [gun, { newWeapon: "wa" }],
      healthType: { ...healthType },
    };

    const otherChar = { ...starWardChar };

    otherChar.name = "chewbacca";
    otherChar.species = "wookie";

    //modifying this obj will modify the starWardChar obj
    //cause we copy the references
    otherChar.healthType.color = "black";

    cl(`starWardChar.name `, starWardChar.name);
    cl(` otherChar.name`, otherChar.name);

    cl(`starWardChar `, starWardChar);
    cl(`otherChar `, otherChar);

    // 		starWardChar.name  han solo
    //  otherChar.name chewbacca
    // starWardChar  {
    //   name: 'han solo',
    //   species: 'human',
    //   guns: [ { damage: '12', weight: '34' }, { newWeapon: 'wa' } ],
    //   healthType: { height: '124', weight: '55kg', color: 'black' }
    // }
    // otherChar  {
    //   name: 'chewbacca',
    //   species: 'wookie',
    //   guns: [ { damage: '12', weight: '34' }, { newWeapon: 'wa' } ],
    //   healthType: { height: '124', weight: '55kg', color: 'black' }
    // }
  }

  function cloneDeepV1(entity) {
    return /Array|Object/.test(Object.prototype.toString.call(entity))
      ? Object.assign(
          new entity.constructor(),
          ...Object.keys(entity).map((prop) => ({ [prop]: cloneDeepV1(entity[prop]) }))
        )
      : entity;
  }

  function cloneDeepV2(entity, cache = new WeakMap()) {
    const referenceTypes = ["Array", "Object"];

    const entityType = Object.prototype.toString.call(entity);
    cl("entityType ", entityType);
    if (!new RegExp(referenceTypes.join("|")).test(entityType)) return entity;

    if (cache.has(entity)) return cache.get(entity);

    const c = new entity.constructor();

    cl("new entity.constructor() ", c);

    cache.set(entity, c);

    return Object.assign(c, ...Object.keys(entity).map((prop) => ({ [prop]: cloneDeepV2(entity[prop], cache) })));
  }

  function cloneDeepV3(entity, cache = new WeakMap()) {
    const referenceTypes = ["Array", "Object", "Map", "Set", "WeakMap", "WeakSet"];

    const entityType = Object.prototype.toString.call(entity);
    if (!new RegExp(referenceTypes.join("|")).test(entityType)) return entity;

    if (cache.has(entity)) return cache.get(entity);

    const c = new entity.constructor();
    if (entity instanceof Map || entity instanceof WeakMap) {
      entity.forEach((value, key) => c.set(cloneDeepV3(key), cloneDeepV3(value)));
    }

    if (entity instanceof Set || entity instanceof WeakSet) {
      entity.forEach((value) => c.add(cloneDeepV3(value)));
    }

    cache.set(entity, c);

    return Object.assign(c, ...Object.keys(entity).map((prop) => ({ [prop]: cloneDeepV2(entity[prop], cache) })));
  }

  function cloneDeepSamples() {
    function runCloneDeep(cloneDeep) {
      const obj1 = { a: 1, b: { c: 2, d: [3, 4, { e: 5 }] } };

      const obj2 = cloneDeep(obj1);

      obj2.b.d[2].e = 6;
      obj2.b.c = "changed value of c key";

      cl(`obj1 `, obj1);
      cl(`obj2 `, obj2);

      cl(`obj1.b.d[2].e`, obj1.b.d[2].e);
      cl(`obj2.b.d[2].e`, obj2.b.d[2].e);

      const obj11 = {};
      obj11.ref = obj11;
      try {
        const obj12 = cloneDeep(obj11);
        cl("obj12 ", obj12);
        cl(`obj12.ref `, obj12.ref);
      } catch (error) {
        cl(error.message);
      }
      debugger;
      const wm1 = new WeakMap();
      const o1 = {};
      const o2 = function () {};
      wm1.set(o1, "val1");
      wm1.set(o2, "val2");
      cl(`wm1.get(o1)`, wm1.get(o1));
      cl(`wm1.get(o2) `, wm1.get(o2));

      cl(`wm1 `, wm1);
      try {
        const copiedWm1 = cloneDeep(wm1);

        cl(`copiedWm1.get(o1)`, copiedWm1.get(o1));
        cl(`copiedWm1.get(o2) `, copiedWm1.get(o2));

        cl(`copiedWm1 `, copiedWm1);
      } catch (error) {
        cl(error.message);
      }
    }

    // runCloneDeep(cloneDeepV1);
    runCloneDeep(cloneDeepV2);
    // runCloneDeep(cloneDeepV3);
  }

  (function runSamplesAbove() {
    // spreadOperatorCopy();
    cloneDeepSamples();
  })();
}

(function main() {
  differentSamples();
})();
