/**
 * Model definition file
 * New models need to be added to the models/index.ts file
 *
 * /models/User.model.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { Sequelize, Model, INTEGER, CreationOptional, Optional, Association, NonAttribute, STRING } from "sequelize";
import { Login } from "./Login.model";

type UserAttributes = {
    id : number;
    userId : string;
}

type UserOptionals = Optional<UserAttributes, "id">;

/**
 * Define the model class
 */
export class User extends Model<UserAttributes, UserOptionals> implements UserAttributes {

    declare id : number;

    declare userId : string;

    declare readonly createdAt : CreationOptional<Date>;

    declare readonly updatedAt : CreationOptional<Date>;

    declare static associations : {
        User : Association<User, Login>
    };

    declare readonly Logins ?: NonAttribute<Login[]>;

    /**
     * Register the database model
     * @param connection A database connection
     */
    public static registerModel ( connection : Sequelize ) {

        User.init( {

            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },

            userId: {
                type: STRING( 32 ),
                allowNull: false,
                validate: {
                    isNumeric: true
                }
            }

        }, {

            sequelize: connection,
            charset: "utf8",
            collate: "utf8_general_ci",
            freezeTableName: true,
            indexes: [
                {
                    unique: true,
                    fields: [ "userId" ]
                }
            ]

        } );

    }

    /**
     * Register all "has" model associations
     */
    public static registerHas () {
        User.hasMany( Login, { as: "Logins", sourceKey: "id", foreignKey: "userId" } );
    }

    /**
     * Register all "belongs" model associations
     */
    public static registerBelongs () {}

}
