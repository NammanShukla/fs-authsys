module.exports = {
  async up(db) {
    const employees = await db.collection('employees').find().toArray();

    for (const emp of employees) {
      const updates = {};
      let needsUpdate = false;

      for (const key in emp) {
        if (/^[A-Z]/.test(key)) {
          const newKey = key.charAt(0).toLowerCase() + key.slice(1);
          updates[newKey] = emp[key];
          updates[key] = '__REMOVE__';
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        const $set = {};
        const $unset = {};

        for (const [key, value] of Object.entries(updates)) {
          if (value === '__REMOVE__') {
            $unset[key] = "";
          } else {
            $set[key] = value;
          }
        }

        await db.collection('employees').updateOne(
          { _id: emp._id },
          {
            ...(Object.keys($set).length ? { $set } : {}),
            ...(Object.keys($unset).length ? { $unset } : {})
          }
        );
      }
    }
  },

  async down(db) {
    const employees = await db.collection('employees').find().toArray();

    for (const emp of employees) {
      const updates = {};
      let needsUpdate = false;

      for (const key in emp) {
        if (/^[a-z]/.test(key)) {
          const capitalKey = key.charAt(0).toUpperCase() + key.slice(1);
          updates[capitalKey] = emp[key];
          updates[key] = '__REMOVE__';
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        const $set = {};
        const $unset = {};

        for (const [key, value] of Object.entries(updates)) {
          if (value === '__REMOVE__') {
            $unset[key] = "";
          } else {
            $set[key] = value;
          }
        }

        await db.collection('employees').updateOne(
          { _id: emp._id },
          {
            ...(Object.keys($set).length ? { $set } : {}),
            ...(Object.keys($unset).length ? { $unset } : {})
          }
        );
      }
    }
  }
};
