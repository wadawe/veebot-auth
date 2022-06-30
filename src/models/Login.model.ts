/**
 * Model definition file
 * New models need to be added to the models/index.ts file
 *
 * /models/Login.model.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { Sequelize, Model, INTEGER, CreationOptional, Optional, Association, NonAttribute } from "sequelize";
import { User } from "./User.model";

type LoginAttributes = {
    id : number;
    userId : number;
}

type LoginOptionals = Optional<LoginAttributes, "id">;

/**
 * Define the model class
 */
export class Login extends Model<LoginAttributes, LoginOptionals> implements LoginAttributes {

    declare id : number;

    declare userId : number;

    declare readonly createdAt : CreationOptional<Date>;

    declare readonly updatedAt : CreationOptional<Date>;

    declare static associations : {
        User : Association<Login, User>
    };

    declare readonly User ?: NonAttribute<User>;

    /**
     * Register the database model
     * @param connection A database connection
     */
    public static registerModel ( connection : Sequelize ) {

        Login.init( {

            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },

            // Foreign key : User
            userId: {
                type: INTEGER,
                allowNull: false
            }

        }, {

            sequelize: connection,
            charset: "utf8",
            collate: "utf8_general_ci",
            freezeTableName: true,
            indexes: [
                {
                    unique: false,
                    fields: [ "userId" ]
                }
            ]

        } );

    }

    /**
     * Register all "has" model associations
     */
    public static registerHas () {}

    /**
     * Register all "belongs" model associations
     */
    public static registerBelongs () {
        Login.belongsTo( User, { as: "User", foreignKey: "userId", targetKey: "id" } );
    }

}
