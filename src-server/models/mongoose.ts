import mongoose, { Schema } from 'mongoose';

mongoose.connect('mongodb://localhost/ratings', { useNewUrlParser: true });

export interface DefaultDoc extends mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

function upsertTimestamps(schema: Schema) {
  schema.add({
    createdAt: Date,
    updatedAt: Date
  });

  schema.pre('save', function(this: DefaultDoc, next) {
    if (this.isNew) {
      this.createdAt = new Date();
    }

    next();
  });

  schema.pre('update', function(this: DefaultDoc, next) {
    this.updatedAt = new Date();

    next();
  });
}

mongoose.plugin(upsertTimestamps);

export { mongoose };
