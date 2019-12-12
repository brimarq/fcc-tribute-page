document.addEventListener('DOMContentLoaded', () => {
  

  useCustomFccToggler();

  // Replace original fCC test suite toggler with one that doesn't clash with page elements
  async function useCustomFccToggler() {
    const fccTestSuite = document.querySelector("#fcc_test_suite_wrapper");
    const newToggler = document.querySelector("#custom_fcc_foldout_toggler");

    if (!fccTestSuite) return console.log("*** FCC TEST SUITE NOT LOADED ***");
    if (!newToggler) return console.log("*** MISSING ELEMENT: #custom_fcc_foldout_toggler ***");

    try {
      const queryResults = await querySelectorAllPromise('#fcc_toggle, #fcc_foldout_toggler, #fcc_foldout_menu', fccTestSuite.shadowRoot);

      const fccToggle = queryResults.find(el => el.id === 'fcc_toggle');
      const fccToggler = queryResults.find(el => el.id === 'fcc_foldout_toggler');
      const fccMenu = queryResults.find(el => el.id === 'fcc_foldout_menu');

      // Hide original toggler & toggle
      if (fccToggler) fccToggler.style.display = 'none';
      if (fccToggle) fccToggle.style.display = 'none';
      // Close test menu if it's open by default
      if (fccMenu && fccToggle && fccMenu.getBoundingClientRect().left >= 0) toggleCheckbox(fccToggle);

      return newToggler.addEventListener('click', newTogglerClickHandler);

      function toggleCheckbox(checkbox) { return checkbox.checked ^= 1; }

      function newTogglerClickHandler() {
        toggleCheckbox(fccToggle);
        return this.classList.toggle('is-open');
      }

      function querySelectorAllPromise(selector, parentNode = document) {
        return new Promise((resolve, reject) => {
          let result = parentNode.querySelectorAll(selector);
  
          if (result.length) {
            result.length > 1 ? resolve(Array.from(result)) : resolve(result[0]);
          }
  
          new MutationObserver((mutationRecords, observer) => {
            result = parentNode.querySelectorAll(selector);
            if (result.length) observer.disconnect();
            result.length > 1 ? resolve(Array.from(result)) : resolve(result[0]);
          }).observe(parentNode, {childList: true, subtree: true }); 
    
        });
      }
      
    } catch(err) {
      console.error(err);
    }
    
  }

});
