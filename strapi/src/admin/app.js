import StripeForm from "./extensions/components/StripeForm";

export default {
    bootstrap(app) {
        app.injectContentManagerComponent('editView', 'right-links', {
          name: 'StripeForm',
          Component: StripeForm,
        });
    }
}