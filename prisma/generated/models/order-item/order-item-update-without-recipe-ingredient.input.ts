import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { OrderUpdateOneRequiredWithoutOrderItemsNestedInput } from '../order/order-update-one-required-without-order-items-nested.input';

@InputType()
export class OrderItemUpdateWithoutRecipeIngredientInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Int, {nullable:true})
    quantity?: number;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => OrderUpdateOneRequiredWithoutOrderItemsNestedInput, {nullable:true})
    order?: OrderUpdateOneRequiredWithoutOrderItemsNestedInput;
}
