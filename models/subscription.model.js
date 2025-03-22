import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
        },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price must be greater than 0']
    },
    currency: {
        type: String,
        enum: ['USD', 'KES', 'EUR'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance'],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past',
        }
    },
    RenewalDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value < this.startDate;
            },
            message: 'Renewal date must be after the start date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,

    }
}, options: {timestamps: true});


// Auto-calculate renewal date if missing.
subscriptionSchema.pre(method: 'save', fn:function (next) {
    if(!this.RenewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        
        this.RenewalDate = new Date(this.startDate);
        this.RenewalDate.setData(this,this.RenewalDate.getData() + renewalPeriods [ this.frequency]
    }

    //Auto-update the server if renewal date has passed
    if (this.RenewalDate < new Data ()) {
        this.status = 'expired';
    }

    next();
})

const Subscription = mongoose.model(name: 'Subscriptions', subscriptionSchema);

export default Subscription;

