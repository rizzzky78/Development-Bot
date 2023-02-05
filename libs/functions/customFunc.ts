class itemExistValidator {
  userItemStorage: [
    {
      type: string;
      value: string;
    }
  ];
  itemToClaim: string;
  constructor(objectItem: { userItemStorage: any; itemToClaim: string }) {
    const { userItemStorage, itemToClaim } = objectItem;
    this.userItemStorage = userItemStorage;
    this.itemToClaim = itemToClaim;
  }

  isValid() {
    const searchValue = this.userItemStorage.find(
      (select) => select.value == this.itemToClaim
    );
    if (searchValue == null) {
      return true; // valid
    } else if (searchValue && searchValue.value == this.itemToClaim) {
      return false; // not valid, user already claim
    }
  }
}

const globaItemValidator = (objectItem: {
  globalItemData: [{ type: string; value: string }];
  userInputItem: string;
}) => {
  const { globalItemData, userInputItem } = objectItem;
  const getValue = globalItemData.find(
    (itemData) => itemData.value == userInputItem
  );
  if (!getValue || getValue == null) {
    return { getValue: null, state: false };
  } else if (getValue) {
    return { getValue, state: true };
  }
};
