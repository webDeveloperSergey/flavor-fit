import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { RecipeIngredientUpdateOneRequiredWithoutOrderItemsNestedInput } from '../recipe-ingredient/recipe-ingredient-update-one-required-without-order-items-nested.input';
import { Type } from 'class-transformer';
import { OrderUpdateOneRequiredWithoutOrderItemsNestedInput } from '../order/order-update-one-required-without-order-items-nested.input';

@InputType()
export class OrderItemUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    quantity?: NullableIntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => RecipeIngredientUpdateOneRequiredWithoutOrderItemsNestedInput, {nullable:true})
    @Type(() => RecipeIngredientUpdateOneRequiredWithoutOrderItemsNestedInput)
    recipeIngredient?: RecipeIngredientUpdateOneRequiredWithoutOrderItemsNestedInput;

    @Field(() => OrderUpdateOneRequiredWithoutOrderItemsNestedInput, {nullable:true})
    order?: OrderUpdateOneRequiredWithoutOrderItemsNestedInput;
}
